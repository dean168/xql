package org.learning.xql.model.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.learning.basic.core.domain.BasicOrder;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

@JsonAutoDetect(creatorVisibility = NONE, fieldVisibility = NONE, getterVisibility = NONE, setterVisibility = NONE, isGetterVisibility = NONE)
public class XQLColumn extends BasicOrder {

    @JsonProperty("exprs")
    private String exprs;

    public String getExprs() {
        return exprs;
    }

    public void setExprs(String exprs) {
        this.exprs = exprs;
    }
}
