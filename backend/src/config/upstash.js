import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis'; //client for Upstash Redis (a cloud Redis database). Used to store request counters.
import dotenv from "dotenv"
dotenv.config() //makes process.env.* available in your app.

// create a ratelimiter that allows 10 requests per 20 seconds
const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter:Ratelimit.slidingWindow(10,"20 s")
});

export default ratelimit;
