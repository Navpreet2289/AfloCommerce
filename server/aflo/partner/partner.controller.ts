import Partner from './partner.model';
import AfloBaseCtrl from './../base';
import Config from './../../config';
let config = new Config();
import * as _ from 'lodash';

export default class PartnerCtrl extends AfloBaseCtrl {
  model = Partner;

  // // Gets a list of Partners
  getAll = (req, res) => {
    let q: any = {};
    let search: any = {};
    let query = req.query;
    if (query) {
      if (query.where) q = this.toJson(query.where);
      if (query.search) search = this.toJson(query.search);
      if (search.name) q.name = new RegExp(search.name.toLowerCase(), 'i');
      let select = query.select;
      let sort = query.sort;
      let skip = parseInt(query.skip);
      let limit = parseInt(query.limit);
    }
    req.query.where = q;
    this.index(req, res);
  }


  create = (req, res) => {
    req.body.uid = req.user.email // id change on every registration of user hence email is used so that history will be available
    req.body.companyName = req.body.companyName;
    req.body.approved = true;
   
    return Partner.create(req.body)
      .then(this.respondWithResult(res, 201))
      .catch(this.handleError(res))
  }

  patch = (req, res) => {
    if (req.body._id) { delete req.body._id }
    if (req.body.approved && req.user.role === 'vendor') { delete req.body.approved } // Security for Admin

    return Partner.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.patchUpdates(req.body))
      .then(this.respondWithResult(res))
      .catch(this.handleError(res))
  }

}