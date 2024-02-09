import { Strategy, ExtractJwt } from "passport-jwt";
import { FindOneUser } from "../services/user.service";
import { PassportStatic } from "passport";

const PassportJwt = (passport: PassportStatic) => {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  passport.use(
    new Strategy(opts, (jwtPayload, done) => {
      FindOneUser(jwtPayload.username)
        .then((user) => {
          if (user) {
            return done(null, user.dataValues);
          }
          return done(null, false);
        })
        .catch((err) => {
          return done(err, false);
        });
    })
  );
};

export { PassportJwt };
export default PassportJwt;
