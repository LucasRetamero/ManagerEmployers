import { InitDB } from '@/database/database-init';
import { Slot } from 'expo-router';
import { SQLiteProvider } from 'expo-sqlite';

export default function layout(){
  return(
   <SQLiteProvider databaseName='managerCRM.db' onInit={InitDB}>
    <Slot/>
   </SQLiteProvider>
  )
}