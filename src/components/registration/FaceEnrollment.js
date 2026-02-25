import React, { useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera';
import { useFormContext } from '../../context/FormContext';
import ECILayout from './ECILayout';

const FaceEnrollment = ({ nextStep, prevStep, cancelForm }) => {
    const { formData, updateFormData } = useFormContext();
    const [permission, requestPermission] = useCameraPermissions();
    const [photo, setPhoto] = useState(formData.faceDescriptor || null);
    const cameraRef = useRef(null);

    if (!permission) {
        return <View />;
    }

    if (!permission.granted) {
        return (
            <ECILayout step={13} totalSteps={14} title="M. Face Enrollment" onClose={cancelForm}>
                <View className="flex-1 justify-center items-center py-10">
                    <Text className="text-center mb-6 text-slate-700">We need your permission to use the camera</Text>
                    <TouchableOpacity onPress={requestPermission} className="bg-blue-600 px-6 py-3 rounded-lg">
                        <Text className="text-white font-bold">Grant Permission</Text>
                    </TouchableOpacity>
                </View>
            </ECILayout>
        );
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            try {
                const result = await cameraRef.current.takePictureAsync({
                    quality: 0.5,
                    base64: true,
                });
                setPhoto(result.uri);
                // Storing URI for preview, could use base64 for API
                updateFormData({ faceDescriptor: result.base64 || result.uri });
            } catch (e) {
                console.error(e);
            }
        }
    };

    const retakePicture = () => {
        setPhoto(null);
        updateFormData({ faceDescriptor: null });
    };

    return (
        <ECILayout step={13} totalSteps={14} title="M. Face Enrollment" onClose={cancelForm}>
            <View className="gap-4 h-[450px]">
                {photo ? (
                    <View className="flex-1 items-center justify-center">
                        <Image source={{ uri: photo }} className="w-64 h-80 rounded-2xl mb-4" />
                        <TouchableOpacity onPress={retakePicture} className="bg-slate-200 px-6 py-3 rounded-lg">
                            <Text className="text-slate-700 font-bold">Retake</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View className="flex-1 overflow-hidden rounded-2xl bg-black">
                        <CameraView
                            style={{ flex: 1 }}
                            facing="front"
                            ref={cameraRef}
                        />
                        <TouchableOpacity
                            onPress={takePicture}
                            className="absolute bottom-6 self-center bg-white w-16 h-16 rounded-full border-4 border-slate-300 items-center justify-center"
                        >
                            <View className="w-12 h-12 bg-red-500 rounded-full" />
                        </TouchableOpacity>
                    </View>
                )}

                <Text className="text-center text-slate-500 text-xs">
                    Please ensure your face is clearly visible and well-lit.
                </Text>
            </View>

            <View className="mt-8 flex-row justify-between">
                <TouchableOpacity onPress={prevStep} className="border border-blue-600 px-6 py-3 rounded-lg">
                    <Text className="text-blue-600 font-bold">Previous</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={nextStep}
                    disabled={!photo}
                    className={`px-6 py-3 rounded-lg ${photo ? 'bg-blue-600' : 'bg-slate-300'}`}
                >
                    <Text className="text-white font-bold">Submit Form</Text>
                </TouchableOpacity>
            </View>
        </ECILayout>
    );
};
export default FaceEnrollment;
