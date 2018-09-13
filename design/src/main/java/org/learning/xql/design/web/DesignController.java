package org.learning.xql.design.web;

import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.learning.basic.core.domain.Pagination;
import org.learning.basic.core.domain.SearchForm;
import org.learning.basic.core.domain.SessionContext;
import org.learning.basic.dao.IHibernateOperations;
import org.learning.basic.dao.support.SQLSupport.SQL;
import org.learning.basic.utils.ByteUtils;
import org.learning.basic.utils.JsonUtils.Jackson;
import org.learning.basic.utils.StatusUtils.Status;
import org.learning.basic.web.controller.BasicController;
import org.learning.xql.model.domain.XQLDatabase;
import org.learning.xql.model.domain.XQLModel;
import org.learning.xql.model.domain.XQLSource;
import org.learning.xql.model.domain.XQLTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.InputStream;
import java.util.Date;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static org.springframework.web.bind.annotation.RequestMethod.*;

@RestController
@RequestMapping("design")
public class DesignController extends BasicController {

    @Autowired
    @Qualifier(IHibernateOperations.SERVICE_ID)
    private IHibernateOperations hibernateOperations;

    @RequestMapping(method = POST, value = "/sources/list",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status listSources(@RequestBody SearchForm form) {
        SQL sql = new SQL();
        sql.append("from ").append(XQLSource.class);
        Pagination<XQLSource> pagination = hibernateOperations.findForPagination(sql.getSQL(), form.getOffset(), form.getLimit(), sql.getParams());
        return new Status(true, null, pagination);
    }

    @RequestMapping(method = GET, value = "/sources/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status getSource(@PathVariable String id) {
        return new Status(true, null, hibernateOperations.get(XQLSource.class, id));
    }

    @RequestMapping(method = POST, value = "/sources/store",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status storeSource(InputStream is) throws IOException {
        String content = IOUtils.toString(is, ByteUtils.CHARSET_NAME);
        XQLSource source = Jackson.readValue(content, XQLSource.class);
        if (source.getType() != null && source.getType() == XQLSource.DATABASE_TYPE) {
            source = Jackson.readValue(content, XQLDatabase.class);
        } else {
            return new Status(false, "source type#" + source.getType() + " not found");
        }
        SessionContext context = SessionContext.get();
        if (StringUtils.isNotEmpty(source.getId())) {
            XQLSource sourceToUse = hibernateOperations.load(XQLSource.class, source.getId());
            source.created(sourceToUse.getCreatedBy(), sourceToUse.getCreatedAt());
        } else {
            source.created(context.accountId(), new Date());
        }
        source.updated(context.accountId(), new Date());
        return new Status(true, null, hibernateOperations.xmerge(source));
    }

    @RequestMapping(method = DELETE, value = "/sources/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status deleteSource(@PathVariable String id) {
        hibernateOperations.xdelete(XQLSource.class, id);
        return new Status(true);
    }

    @RequestMapping(method = POST, value = "/tables/list",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status listTables(@RequestBody SearchForm form) {
        SQL sql = new SQL();
        sql.append("from ").append(XQLTable.class);
        Pagination<XQLSource> pagination = hibernateOperations.findForPagination(sql.getSQL(), form.getOffset(), form.getLimit(), sql.getParams());
        return new Status(true, null, pagination);
    }

    @RequestMapping(method = GET, value = "/tables/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status getTable(@PathVariable String id) {
        return new Status(true, null, hibernateOperations.get(XQLTable.class, id));
    }

    @RequestMapping(method = POST, value = "/tables/store",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status storeTable(@RequestBody XQLTable table) {
        return new Status(true, null, hibernateOperations.xmerge(table));
    }

    @RequestMapping(method = DELETE, value = "/tables/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status deleteTable(@PathVariable String id) {
        hibernateOperations.xdelete(XQLTable.class, id);
        return new Status(true);
    }

    @RequestMapping(method = POST, value = "/models/list",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status listModels(@RequestBody SearchForm form) {
        SQL sql = new SQL();
        sql.append("from ").append(XQLModel.class);
        Pagination<XQLSource> pagination = hibernateOperations.findForPagination(sql.getSQL(), form.getOffset(), form.getLimit(), sql.getParams());
        return new Status(true, null, pagination);
    }

    @RequestMapping(method = GET, value = "/models/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status getModel(@PathVariable String id) {
        return new Status(true, null, hibernateOperations.get(XQLModel.class, id));
    }

    @RequestMapping(method = POST, value = "/models/store",
            consumes = {APPLICATION_JSON_UTF8_VALUE},
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status storeModel(@RequestBody XQLModel model) {
        return new Status(true, null, hibernateOperations.xmerge(model));
    }

    @RequestMapping(method = DELETE, value = "/models/{id}",
            produces = {APPLICATION_JSON_UTF8_VALUE})
    public Status deleteModel(@PathVariable String id) {
        hibernateOperations.xdelete(XQLModel.class, id);
        return new Status(true);
    }
}
