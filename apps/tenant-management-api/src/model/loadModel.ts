import { Sequelize } from 'sequelize';
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

const db: Record<string, any> = {};

const loadModel = async (sequelize: Sequelize): Promise<void> => {
    const modelFiles = fs.readdirSync(__dirname)
        .filter(file =>
            file.indexOf('.') !== 0 &&
            file !== path.basename(__filename) &&
            (file.endsWith('.ts') || file.endsWith('.js')) &&
            !file.includes('.test.')
        );

    for (const file of modelFiles) {
        const modelPath = path.join(__dirname, file);
        const modelUrl = pathToFileURL(modelPath).href;
        const modelModule = await import(modelUrl);

        if (modelModule.default) {
            const model = modelModule.default;
            model.initModel(sequelize);
            db[model.name] = model;
        } else {
            console.error(`❌ Model ${file} did not load correctly.`);
        }
    }

    // **Set up associations after all models are loaded**
    Object.values(db).forEach((model) => {
        if (typeof model.associate === "function") {
            model.associate(db);
        }
    });

    console.log("✅ Models loaded and associations set.");
};

export { loadModel, db };
