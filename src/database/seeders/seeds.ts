import { dataSource } from './../../../ormconfig';
import { DataSource } from 'typeorm';
import { createInitialData } from './initial';

dataSource.initialize()
  .then(async (dataSource: DataSource) => {
    console.log('📦 Ejecutando seeders...');
    await createInitialData(dataSource);
    console.log('✅ Seed completado.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('❌ Error ejecutando seeders:', err);
    process.exit(1);
  });