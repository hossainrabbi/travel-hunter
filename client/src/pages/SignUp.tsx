import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserType } from '../types/AuthType';

export default function SignUp() {
  const [userData, setUserData] = useState<UserType>({
    username: '',
    mobile: '+880',
    password: '',
  });

  const { loading, error, registerUser } = useAuth();

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

      {error?.message && <p>{error?.message}</p>}

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
          {error?.username && (
            <p className="text-red-700">{error.username.msg}</p>
          )}
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
          {error?.mobile && <p className="text-red-700">{error.mobile.msg}</p>}
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
          {error?.password && (
            <p className="text-red-700">{error.password.msg}</p>
          )}
        </div>

        <button
          className="btn btn-primary mt-5"
          type="submit"
          disabled={loading}
        >
          {loading ? 'loading...' : 'Singup'}
        </button>
      </form>
    </section>
  );
}
