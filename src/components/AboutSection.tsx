export function AboutSection() {
  return (
    <section className="bg-zinc-950 py-20 px-6 mt-10">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">
          Tentang <span className="text-red-600">NexMarket</span>
        </h2>
        <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-full"></div>
        <p className="text-zinc-400 leading-relaxed text-lg">
          NexMarket adalah platform marketplace modern bertenaga AI yang dirancang khusus untuk memenuhi kebutuhan gaya hidup digital Anda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="p-6">
            <i className="fas fa-robot text-3xl text-red-600 mb-4"></i>
            <h5 className="font-bold mb-2">Asisten AI Cerdas</h5>
            <p className="text-xs text-zinc-500">Dapatkan rekomendasi belanja terbaik.</p>
          </div>
          <div className="p-6">
            <i className="fas fa-bolt text-3xl text-red-600 mb-4"></i>
            <h5 className="font-bold mb-2">Pencarian Instan</h5>
            <p className="text-xs text-zinc-500">Temukan barang dengan teknologi terbaru.</p>
          </div>
          <div className="p-6">
            <i className="fas fa-headset text-3xl text-red-600 mb-4"></i>
            <h5 className="font-bold mb-2">Dukungan 24/7</h5>
            <p className="text-xs text-zinc-500">AI kami selalu siap membantu Anda.</p>
          </div>
        </div>
      </div>
    </section>
  );
}