export const errorfunc = (func) => {
  return (req, res, next) => {
    func(req, res, next).catch((er) => next(er));
  };
};
