import http from "k6/http";
import { sleep } from "k6";

export default function () {
  http.get("http://localhost:3000/watch");
  sleep(1);
}

//load testing command e.g. run:
// k6 run --vus 1000 --duration 30s .\k6.js
