import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc } from 'firebase/firestore'
import { db } from './firebase'

const products = () => collection(db, 'products')
export const subscribeProducts = (callback, onError) => onSnapshot(query(products(), orderBy('name')), (snapshot) => callback(snapshot.docs.map((item) => ({ id: item.id, ...item.data() }))), onError)
export const createProduct = (data) => addDoc(products(), { ...data, stock: Number(data.stock), minStock: Number(data.minStock), capitalPrice: Number(data.capitalPrice), sellingPrice: Number(data.sellingPrice), isActive: true, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
export const updateProduct = (id, data) => updateDoc(doc(db, 'products', id), { ...data, stock: Number(data.stock), minStock: Number(data.minStock), capitalPrice: Number(data.capitalPrice), sellingPrice: Number(data.sellingPrice), updatedAt: serverTimestamp() })
export const archiveProduct = (id) => updateDoc(doc(db, 'products', id), { isActive: false, updatedAt: serverTimestamp() })
export const removeProduct = (id) => deleteDoc(doc(db, 'products', id))
