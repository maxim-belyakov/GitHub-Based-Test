package com.sportradar.fullstack.util;

import org.apache.commons.text.StringEscapeUtils;
import org.springframework.stereotype.Component;

@Component
public class InputSanitizer {
    
    public String sanitize(String input) {
        if (input == null) {
            return null;
        }
        
        // Remove any HTML/XML tags
        String sanitized = input.replaceAll("<[^>]*>", "");
        
        // Escape HTML entities
        sanitized = StringEscapeUtils.escapeHtml4(sanitized);
        
        // Remove any script tags or javascript
        sanitized = sanitized.replaceAll("(?i)<script.*?>.*?</script>", "");
        sanitized = sanitized.replaceAll("(?i)javascript:", "");
        sanitized = sanitized.replaceAll("(?i)on\\w+\\s*=", "");
        
        // Trim whitespace
        sanitized = sanitized.trim();
        
        return sanitized;
    }
}