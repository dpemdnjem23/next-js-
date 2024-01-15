import { setUpWorker } from "msw/browser";
import { handlers } from "./handlers";

const worker = setUpWorker(...handlers);

export default worker
