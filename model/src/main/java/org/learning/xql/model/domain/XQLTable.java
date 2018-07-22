package org.learning.xql.model.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.learning.basic.core.domain.Basic;

import java.util.Set;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

@JsonAutoDetect(creatorVisibility = NONE, fieldVisibility = NONE, getterVisibility = NONE, setterVisibility = NONE, isGetterVisibility = NONE)
public class XQLTable extends Basic {

    @JsonProperty("source")
    private XQLSource source;
    @JsonProperty("name")
    private String name;
    @JsonProperty("fields")
    private Set<XQLField> fields;

    public XQLSource getSource() {
        return source;
    }

    public void setSource(XQLSource source) {
        this.source = source;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Set<XQLField> getFields() {
        return fields;
    }

    public void setFields(Set<XQLField> fields) {
        this.fields = fields;
    }
}
