import inquirer from 'inquirer';
import qr from "qr-image";
import fs from "fs";

async function getUserInput() {
    try {
        const answers = await inquirer.prompt([
            {
                type: "input",
                name: "url",
                message: "Enter the URL of your website: ",
                validate: input => input ? true : "URL cannot be empty!"
            }
        ]);
        return answers.url;
    } 
    catch (error) {
        console.error("Error getting user input:", error.message);
    }
}

async function qrGenerator() {
    try {
        const url = await getUserInput();
        const qr_image_generate = qr.image(url, { type: 'png' });
        qr_image_generate.pipe(fs.createWriteStream('qrcode.png'));
        console.log("✅ QR Code image is generated successfully as 'qrcode.png'!");

    } catch (error) {
        console.error("Error generating QR Code:", error.message);
    }
}

qrGenerator();
