import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { RegisterUserType } from '../types/AuthType';

export default function SignUp() {
  const [userData, setUserData] = useState<RegisterUserType>({
    username: '',
    mobile: '+880',
    password: '',
  });

  const { registerUser } = useAuth();

  //  user value change handler
  const handleUserDataChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  //  user submit handler
  const handleRegisterUser = (e: FormEvent) => {
    e.preventDefault();

    registerUser(userData);
  };

  return (
    <section className="wrapper">
      <h3>Create an account</h3>

      <form className="max-w-3xl mx-auto" onSubmit={handleRegisterUser}>
        <div className="form-control w-full">
          <label htmlFor="username" className="label">
            Username
          </label>
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            id="username"
            className="input input-bordered w-full"
            value={userData.username}
            onChange={handleUserDataChange}
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="mobile" className="label">
            mobile number
          </label>
          <input
            type="text"
            placeholder="Enter mobile number"
            name="mobile"
            id="mobile"
            className="input input-bordered w-full"
            value={userData.mobile}
            onChange={handleUserDataChange}
          />
        </div>

        <div className="form-control w-full">
          <label htmlFor="password" className="label">
            password
          </label>
          <input
            type="password"
            placeholder="Enter password"
            name="password"
            id="password"
            className="input input-bordered w-full"
            value={userData.password}
            onChange={handleUserDataChange}
          />
        </div>

        <button className="btn btn-primary mt-5">Singin</button>
      </form>
    </section>
  );
}
