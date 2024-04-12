import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/jobs")
                .allowedOrigins("http://localhost:3000") // Allow requests from frontend origin
                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allow specified HTTP methods
                .allowedHeaders("*"); // Allow all headers
    }
}
