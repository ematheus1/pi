import { users } from '../data';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = users[email];
  
  if (user && user.password === password) {
    return new Response(JSON.stringify({ message: "Login realizado com sucesso!" }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } else {
    return new Response(JSON.stringify({ message: "Credenciais incorretas." }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}

export const config = {
  api: {
    bodyParser: true,
  },
};
