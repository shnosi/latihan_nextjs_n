import prisma from '@/lib/prisma';

export async function GET() {
  const data = await prisma.matkul.findMany({
    orderBy: { id: "asc" },
  });

  return new Response(JSON.stringify(data), { status: 200 });
}

export async function POST(request) {
  const { kode, nama } = await request.json();

  if (!kode || !nama) {
    return new Response(JSON.stringify({ error: 'Semua wajib diisi' }), {
      status: 400,
    });
  }

  const matkul = await prisma.matkul.create({
    data: { kode, nama },
  });

  return new Response(JSON.stringify(matkul), { status: 201 });
}

export async function PUT(request) {
  const { id, kode, nama } = await request.json();
  if (!id || !kode || !nama) return Response.json({ error: 'Field kosong' }, {
    status: 400 });

    const matkul = await prisma.matkul.update({
      where: { id },
      data: { kode, nama },
    });

    return Response.json(matkul);
}

export async function DELETE(request) {
  const { id } = await request.json();
  if (!id) return Response.json({ error: 'ID tidak ditemukan' }, { status: 400 });

  await prisma.matkul.delete({ where: { id } });
  return Response.json({ message: 'Berhasil dihapus' });
}