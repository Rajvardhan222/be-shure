import React from 'react'

function FileUploadComponent() {
  return (
    <AddProductInput
                    label="Shop Image"
                    name="shopImage"
                    {...register("shopImage", {
                      required: "Shop image is required",
                      validate: {
                        fileType: (fileList) => {
                          if (fileList && fileList[0]) {
                            const file = fileList[0];
                            const allowedTypes = [
                              "image/jpeg",
                              "image/jpg",
                              "image/png",
                              "image/webp",
                            ];
                            return (
                              allowedTypes.includes(file.type) ||
                              "Please upload a valid image file (JPG, PNG, WEBP)"
                            );
                          }
                          return true;
                        },
                        fileSize: (fileList) => {
                          if (fileList && fileList[0]) {
                            const file = fileList[0];
                            const maxSize = 5 * 1024 * 1024; // 5MB
                            return (
                              file.size <= maxSize ||
                              "File size must be less than 5MB"
                            );
                          }
                          return true;
                        },
                      },
                    })}
                    placeholder="Upload an image of your shop"
                    type="file"
                    accept="image/*"
                    required
                    error={errors.shopImage?.message}
                  />
  )
}

export default FileUploadComponent