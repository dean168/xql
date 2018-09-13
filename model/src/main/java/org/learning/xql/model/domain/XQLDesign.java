package org.learning.xql.model.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.learning.basic.core.domain.Basic;

import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

@JsonAutoDetect(creatorVisibility = NONE, fieldVisibility = NONE, getterVisibility = NONE, setterVisibility = NONE, isGetterVisibility = NONE)
public class XQLDesign extends Basic {

    @JsonProperty("model")
    private XQLModel model;
    @JsonProperty("columns")
    private Set<XQLColumn> columns;
    @JsonProperty("filter")
    private String filter;
    @JsonProperty("sort")
    private String sort;
    @JsonProperty("offset")
    private Integer offset;
    @JsonProperty("limit")
    private Integer limit;

    public XQLModel getModel() {
        return model;
    }

    public void setModel(XQLModel model) {
        this.model = model;
    }

    public Set<XQLColumn> getColumns() {
        return columns;
    }

    public void setColumns(Set<XQLColumn> columns) {
        this.columns = columns;
    }

    public String getFilter() {
        return filter;
    }

    public void setFilter(String filter) {
        this.filter = filter;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public Integer getOffset() {
        return offset;
    }

    public void setOffset(Integer offset) {
        this.offset = offset;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
