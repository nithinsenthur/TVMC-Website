import aws from "aws-sdk"
import multer from "multer"
import multerS3 from "multer-s3"
import dotenv from "dotenv"

if (process.env.NODE_ENV !== 'production') dotenv.config()

aws.config.update({
    secretAccessKey: process.env.AWS_ACCESS_SECRET,
    accessKeyId: process.env.AWS_ACCESS_KEY,
    region: process.env.AWS_REGION
})

const s3 = new aws.S3()

const imageUpload = destinationPath => {
    return multer({
        storage: multerS3({
            bucket: process.env.AWS_BUCKET,
            s3: s3,
            acl: "public-read",
            contentType: multerS3.AUTO_CONTENT_TYPE,
            fileFilter: (req, file, cb) => {
                if (file.mimetype.startsWith('image')) {
                  cb(null, true);
                } else {
                  cb(new AppError('Not an image! Please upload images only.', 400), false)
                }
            },
            key: (req, file, cb) => {
                cb(null, destinationPath + "/" + Date.now() + "-" + file.originalname)
            }
        }),
        limits: 1920*1080
    })
}

const deleteImage = async key => {
    return await s3.deleteObject({
        Bucket: process.env.AWS_BUCKET,
        Key: key
    }).promise()
}

const findImage = async key => {
    return await s3.getObject({
        Bucket: process.env.AWS_BUCKET,
        Key: key
    }).promise()
}

export { imageUpload, deleteImage, findImage }

