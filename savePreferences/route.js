export async function POST(req) {
  const { userId, genres } = await req.json();

  if (!userId || !genres) {
    return new Response(JSON.stringify({ message: "Dados incompletos" }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Aqui você pode adicionar a lógica para salvar as preferências do usuário.
  console.log(`Salvando preferências para o usuário ${userId}: ${genres.join(', ')}`);

  return new Response(JSON.stringify({ message: "Preferências salvas com sucesso!" }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export const config = {
  api: {
    bodyParser: true,
  },
};
