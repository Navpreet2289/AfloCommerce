import CatalogSource from './catalog-source.model';
import AfloBaseCtrl from './../base';
import * as _ from 'lodash';

export default class CatalogSourceCtrl extends AfloBaseCtrl {
  model = CatalogSource;

  // // Gets a list of CatalogSources
  getAll = (req, res) => {
    let q: any = {};
    let search: any = {};
    let query = req.query;
    if (query) {
      if (query.where) q = this.toJson(query.where);
      if (query.search) search = this.toJson(query.search);
      if (search.title) q.title = new RegExp(search.title.toLowerCase(), 'i');
      let select = query.select;
      let sort = query.sort;
      let skip = parseInt(query.skip);
      let limit = parseInt(query.limit);
    }
    req.query.where = q;
    this.index(req, res);
  }


  create = (req, res) => {
    req.body.approved = true;
   
    return CatalogSource.create(req.body)
      .then(this.respondWithResult(res, 201))
      .catch(this.handleError(res))
  }

  patch = (req, res) => {
    if (req.body._id) { delete req.body._id }
    if (req.body.approved && req.user.role === 'vendor') { delete req.body.approved } // Security for Admin

    return CatalogSource.findById(req.params.id).exec()
      .then(this.handleEntityNotFound(res))
      .then(this.patchUpdates(req.body))
      .then(this.respondWithResult(res))
      .catch(this.handleError(res))
  }

}