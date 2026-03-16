function HomePage() {
  return (
    <section className="text-center space-y-6">
      <h1 className="text-4xl md:text-5xl font-bold text-pink-600">
        Why i love you? ❤️
      </h1>

      <p className="text-gray-600">
        Create a page with 50 reasons why that person is so special for you.
      </p>

      <p className="text-gray-600">
        It is a way to share your love in a unique and personalized way.
      </p>

      <a
        href="/create"
        className="inline-block bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 transition"
      >
        Create ❤️
      </a>
    </section>
  );
}

export default HomePage;
