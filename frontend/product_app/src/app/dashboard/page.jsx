'use client'
import Menu from '../components/Menu';
import Link from 'next/link';

export default function Dashboard() {
    return (
      <div>
        <main className="form-signin text-center mt-5">
          <h1>BIENVENIDO A LA TIENDA MINI MARKETPLACE</h1>
<hr />
        </main>
        <div className="d-flex justify-content-center mt-5">
          <Link href="/sesion">
            <button className="btn btn-success">INICIAR SESION</button>
          </Link>
        </div>
      </div>
    );
  }