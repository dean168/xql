package org.learning.xql.model.domain;

import com.fasterxml.jackson.annotation.JsonAutoDetect;
import com.fasterxml.jackson.annotation.JsonProperty;
import org.learning.basic.core.domain.Basic;

import static com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility.NONE;

@JsonAutoDetect(creatorVisibility = NONE, fieldVisibility = NONE, getterVisibility = NONE, setterVisibility = NONE, isGetterVisibility = NONE)
public class XQLModel extends Basic {

    @JsonProperty("name")
    private String name;
    @JsonProperty("source")
    private XQLSource source;
    @JsonProperty("relations")
    private String relations;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public XQLSource getSource() {
        return source;
    }

    public void setSource(XQLSource source) {
        this.source = source;
    }

    public String getRelations() {
        return relations;
    }

    public void setRelations(String relations) {
        this.relations = relations;
    }
}
