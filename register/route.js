export async function POST(req) {
  const { email, password, userId } = await req.json();
  
  if (!email || !password || !userId) {
    return new Response(JSON.stringify({ message: "Dados incompletos." }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Aqui você adicionaria a lógica para salvar o usuário no banco de dados ou arquivo.

  return new Response(JSON.stringify({ message: "Usuário registrado com sucesso!" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  api: {
    bodyParser: true,
  },
};
