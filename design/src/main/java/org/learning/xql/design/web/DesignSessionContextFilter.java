package org.learning.xql.design.web;

import org.learning.basic.core.domain.SessionContext;
import org.learning.basic.web.filter.SessionContextFilter;

import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

public class DesignSessionContextFilter extends SessionContextFilter {

    protected SessionContext current(ServletRequest request, ServletResponse response) {
        SessionContext context = super.current(request, response);
        context.accountId("admin");
        return context;
    }
}
