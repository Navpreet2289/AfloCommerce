import Partner from './partner.model';
import CatalogSource from './../catalog-source/catalog-source.model';

import AfloBaseCtrl from './../base';
import Config from './../../config';
let config = new Config();
import * as _ from 'lodash';
import * as mongoose from 'mongoose';
import * as async from 'async';
//sync = require("async");



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

  // Gets a single Product from the DB
  showDeep = (req, res) => {
    return Partner.findById(req.params.id).populate({ path: 'catalogSources' }).exec((err, docs) => {
      if (err) { return console.error(err); }
      res.json(docs);
    });
  }


  create = (req, res) => {
    let sourceIDs: Array<any> = [];
    req.body.uid = req.user.email // id change on every registration of user hence email is used so that history will be available
    req.body.companyName = req.body.companyName;
    req.body.approved = true;
    let partnerThis = this;

    if(req.body.catalogSources){
      async.each(req.body.catalogSources, (source,callback) => {
        source.sourceId = new mongoose.Types.ObjectId();
        CatalogSource.findOneAndUpdate({_id: source.sourceId }, {title: source.title, sourcePath: source.sourcePath}, {upsert: true, new: true, setDefaultsOnInsert: true }).exec((err, doc) => {
                 if (err) {
                   console.error(err);
                 }else{ 
                   //console.log("New Catalog Source >> ", doc);
                   sourceIDs.push(doc._id);
                   callback();
                 }
        });
      }, function(err){ 
            req.body.catalogSources = sourceIDs;
            
            return Partner.create(req.body)
              .then(partnerThis.respondWithResult(res, 201))
              .catch(partnerThis.handleError(res))
          });

    }

  }

  patch = (req, res) => {
    let sourceIDs: Array<any> = [];
    if (req.body._id) { delete req.body._id }
    if (req.body.approved && req.user.role === 'vendor') { delete req.body.approved } // Security for Admin
    let partnerThis = this;
  
    if(req.body.catalogSources){
      async.each(req.body.catalogSources, (source,callback) => {
        source.sourceId = new mongoose.Types.ObjectId();
        CatalogSource.findOneAndUpdate({_id: source.sourceId }, {title: source.title, sourcePath: source.sourcePath}, {upsert: true, new: true, setDefaultsOnInsert: true }).exec((err, doc) => {
                 if (err) {
                   console.error(err);
                 }else{ 
                   //console.log("New Catalog Source >> ", doc);
                   sourceIDs.push(doc._id);
                   callback();
                 }
        });
      }, function(err){ 
            req.body.catalogSources = sourceIDs;

            return Partner.findById(req.params.id).exec()
              .then(partnerThis.handleEntityNotFound(res))
              .then(partnerThis.patchUpdates(req.body))
              .then(partnerThis.respondWithResult(res))
              .catch(partnerThis.handleError(res))
          });

    }

  }



}