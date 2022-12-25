import { ChangeEvent, FormEvent, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserType } from '../types/AuthType';

export default function SignIn() {
  const [userData, setUserData] = useState<UserType>({
    username: '',
    password: '',
  });

  const { loading, error, loginUser } = useAuth();

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

    loginUser(userData);
  };

  return (
    <section className="wrapper">
      <h3>Login an account</h3>

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

        <button
          className="btn btn-primary mt-5"
          type="submit"
          disabled={loading}
        >
          {loading ? 'loading...' : 'Singin'}
        </button>
      </form>
    </section>
  );
}
