import { Request, Response, Router } from "express";
import { object } from "joi";
import generateSchema from "../utils/generateSchema";
import mqttClient from "../configs/mqtt_connect";
import { Ttest } from "../interface/topic";
const router = Router();

router.post("/", (req: Request, res: Response) => {
  console.log(req.body);
  const message = "123";
  mqttClient.publish(Ttest, message, (err) => {
    if (err) {
      res.send(`Error publishing message: ${err}`);
    } else {
      res.send(`Published message to topic "${Ttest}": ${message}`);
    }
  });
});

export default router;
