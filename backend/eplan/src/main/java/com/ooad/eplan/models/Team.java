package com.ooad.eplan.models;

import lombok.Data;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.persistence.Id;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.util.List;

@Document(collection = "Team")
@Data
public class Team {

    public Team(){}

    public Team(String id, String name, String description, List<@Valid String> members) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.members = members;
    }

    @Id
    private String id;

    @NotNull(message = "{name.null.error}")
    private String name;

    @NotNull(message = "{description.null.error}")
    private String description;

    @NotEmpty(message = "{members.null.error}")
    private List<@Valid String> members;

    private String orgId;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getMembers() {
        return members;
    }

    public void setMembers(List<String> members) {
        this.members = members;
    }

    public String getOrgId() {
        return orgId;
    }

    public void setOrgId(String orgId) {
        this.orgId = orgId;
    }
}
