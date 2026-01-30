import http from "http";

const hostname = "127.0.0.1";
const port = 3000;

const calculateGcd = (a, b) => {
  let x = a;
  let y = b;

  while (true) {
    const remainder = x % y;

    if (remainder == 0) {
      break;
    }

    x = y;
    y = remainder;
  }

  return y;
};

const calculateLcm = (a, b) => {
  const gcd = calculateGcd(a, b);

  const result = (a * b) / gcd;

  return result;
};

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/plain");
  res.statusCode = 200;

  const baseURL = `http://${hostname}`;
  const url = new URL(req.url, baseURL);
  const pathname = url.pathname;

  if (pathname === "/kcnpoow@gmail.com") {
    const xParam = url.searchParams.get("x");
    const yParam = url.searchParams.get("y");

    console.log(xParam, yParam);

    try {
      const x = BigInt(xParam);
      const y = BigInt(yParam);

      const lcm = calculateLcm(x, y);

      res.end(lcm.toString());
    } finally {
      res.end(NaN);
    }
  }
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
