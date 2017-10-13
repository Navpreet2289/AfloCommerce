import AfloMedia from './aflo-media.model';
import BaseCtrl from './../base';

export default class AfloMediaCtrl extends BaseCtrl {
  model = AfloMedia;
  my = (req, res) => {
    req.query.where = { uid: req.user._id };
    req.query.sort = '-updatedAt';
    this.index(req, res);
  }

  // Creates a new Media in the DB
  create = (req, res) => {
    req.body = req.files.file;
    req.body.uid = req.user._id;
    req.body.uname = req.user.name;
    req.body.uemail = req.user.email;
    this.insert(req, res);
  }
}