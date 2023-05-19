package com.genesyscloudtest

import android.util.Log
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter
import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate

class MyModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {
    companion object {
        const val NAME = "MyModule"
    }

    override fun getName(): String {
        return NAME
    }

    @ReactMethod
    fun sum(a: Int, b: Int, promise: Promise) {
        val result = a + b
        promise.resolve(result)
    }

    @ReactMethod
    fun multiply(a: Int, b: Int, promise: Promise) {
        val result = a * b
        promise.resolve(result)
    }

    @ReactMethod
    fun propsMethod(prop1: String, prop2: Int) {
        val params = Arguments.createMap().apply {
            putString("prop1", prop1)
            putInt("prop2", prop2)
        }

        val eventEmitter = reactApplicationContext.getJSModule(RCTDeviceEventEmitter::class.java)
        eventEmitter.emit("onPropsSet", params)
    }
}