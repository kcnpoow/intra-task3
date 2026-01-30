import http from "http";

const port = process.env.PORT || 3000;
const hostname = "0.0.0.0";

const calculateGcd = (a, b) => {
  let x = a;
  let y = b;

  while (y !== 0n) {
    const remainder = x % y;
    x = y;
    y = remainder;
  }

  return x;
};

const calculateLcm = (a, b) => {
  return (a * b) / calculateGcd(a, b);
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");

  const baseURL = `http://localhost`;
  const url = new URL(req.url, baseURL);

  if (url.pathname === "/kcnpoow@gmail.com") {
    try {
      const x = BigInt(url.searchParams.get("x"));
      const y = BigInt(url.searchParams.get("y"));

      const lcm = calculateLcm(x, y);

      res.end(lcm.toString());
    } catch {
      res.end(NaN);
    }
    return;
  }

  res.statusCode = 404;
  res.end("Not found");
});

server.listen(port, hostname, () => {
  console.log(`Server running on port ${port}`);
});
