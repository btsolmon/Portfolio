import AppKit
import CoreImage
import Foundation
import Vision

guard CommandLine.arguments.count >= 3 else {
  fputs("usage: cutout.swift <input> <output>\n", stderr)
  exit(1)
}

let inputPath = CommandLine.arguments[1]
let outputPath = CommandLine.arguments[2]

guard
  let nsImage = NSImage(contentsOfFile: inputPath),
  let tiff = nsImage.tiffRepresentation,
  let bitmap = NSBitmapImageRep(data: tiff),
  let cgImage = bitmap.cgImage
else {
  fputs("Failed to load image: \(inputPath)\n", stderr)
  exit(1)
}

let request = VNGeneratePersonSegmentationRequest()
request.qualityLevel = .accurate
request.outputPixelFormat = kCVPixelFormatType_OneComponent8

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
do {
  try handler.perform([request])
} catch {
  fputs("Vision failed: \(error)\n", stderr)
  exit(1)
}

guard let observation = request.results?.first else {
  fputs("No person mask produced\n", stderr)
  exit(1)
}

let person = CIImage(cgImage: cgImage)
var mask = CIImage(cvPixelBuffer: observation.pixelBuffer)

let scaleX = person.extent.width / mask.extent.width
let scaleY = person.extent.height / mask.extent.height
mask = mask.transformed(by: CGAffineTransform(scaleX: scaleX, y: scaleY))

if let blur = CIFilter(name: "CIGaussianBlur") {
  blur.setValue(mask, forKey: kCIInputImageKey)
  blur.setValue(0.8, forKey: kCIInputRadiusKey)
  if let blurred = blur.outputImage {
    mask = blurred.cropped(to: person.extent)
  }
}

guard
  let blend = CIFilter(name: "CIBlendWithMask")
else {
  fputs("CIBlendWithMask unavailable\n", stderr)
  exit(1)
}

blend.setValue(person, forKey: kCIInputImageKey)
blend.setValue(CIImage.empty().cropped(to: person.extent), forKey: kCIInputBackgroundImageKey)
blend.setValue(mask, forKey: kCIInputMaskImageKey)

guard let cutout = blend.outputImage else {
  fputs("Blend failed\n", stderr)
  exit(1)
}

let context = CIContext(options: [.workingColorSpace: NSNull()])
guard let outCG = context.createCGImage(cutout, from: person.extent, format: .RGBA8, colorSpace: CGColorSpaceCreateDeviceRGB()) else {
  fputs("Failed to render cutout\n", stderr)
  exit(1)
}

let outRep = NSBitmapImageRep(cgImage: outCG)
outRep.size = NSSize(width: outCG.width, height: outCG.height)
guard let png = outRep.representation(using: .png, properties: [:]) else {
  fputs("Failed to encode PNG\n", stderr)
  exit(1)
}

do {
  try png.write(to: URL(fileURLWithPath: outputPath))
  fputs("Wrote \(outputPath) (\(outCG.width)x\(outCG.height))\n", stderr)
} catch {
  fputs("Write failed: \(error)\n", stderr)
  exit(1)
}
