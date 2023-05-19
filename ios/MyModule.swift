// CustomModule.swift

import Foundation

@objc(CustomModule)
class CustomModule: NSObject {
  @objc
  func sayHello(_ name: String, callback: @escaping (String) -> Void) {
    let greeting = "Hello, " + name
    callback(greeting)
  }
}