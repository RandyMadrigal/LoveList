function HomePage() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
        Why i love you? ❤️
      </h1>

      <p className="text-gray-600">
        Crea una página con 30 razones por la cual esa persona es tan especial
        para ti.
      </p>

      <p className="text-gray-600">
        Es una forma de compartir tu amor de una manera única y personalizada.
      </p>

      <a
        href="/create"
        className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
      >
        Crear mis razones ❤️
      </a>
    </section>
  );
}

export default HomePage;
