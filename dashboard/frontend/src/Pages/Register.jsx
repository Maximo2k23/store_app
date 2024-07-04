import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../Firebase/config'; 
import { Link, useNavigate } from 'react-router-dom';
import { setDoc, doc } from 'firebase/firestore'; // Asegúrate de importar las funciones necesarias de Firestore

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar el nombre, correo electrónico y contraseña en Firestore
      await setDoc(doc(db, 'users', user.uid), {
        name: name,
        email: email,
        password: password, // Guardar la contraseña también
      });

      navigate("/");
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center" onSubmit={handleRegister}>
        <h1 className="text-2xl font-bold mb-4">Crea una cuenta</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre de Usuario"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Contraseña"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Registrarse</button>
        <p className='pt-4'>
          Si ya tienes cuenta,{' '}
          <Link to="/login" className="underline text-blue-500">
          Inicia sesión
          </Link>
        </p>

      </form>
    </div>
  );
};

export default Register;
