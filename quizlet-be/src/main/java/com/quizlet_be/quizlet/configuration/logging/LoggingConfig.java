package com.quizlet_be.quizlet.configuration.logging;

import org.springframework.context.annotation.Configuration;

import java.io.PrintWriter;
import java.io.StringWriter;
import java.nio.file.Files;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.logging.*;

@Configuration
public class LoggingConfig {

    private static final Logger logger = Logger.getLogger("com.quizlet_be.quizlet");
    private static final String LOG_DIRECTORY = "logs/";
    private static final String LOG_FILE_BASE = LOG_DIRECTORY + "application-%s.log";
    private static boolean isConfigured = false;

    /**
     *
     */
    public static synchronized void configureLogging() {
        if (isConfigured) {
            return; // Prevent multiple configurations
        }

        try {
            // Remove default handlers to avoid duplicate logging
            final Logger rootLogger = Logger.getLogger("");

            for (final Handler handler : rootLogger.getHandlers()) {
                rootLogger.removeHandler(handler);
            }
            // Create logs directory if it doesn't exist
            Files.createDirectories(java.nio.file.Paths.get(LOG_DIRECTORY));

            // Configure FileHandler with daily rotation
            final String date = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
            final String logFileName = String.format(LOG_FILE_BASE, date);
            final FileHandler fileHandler = new FileHandler(logFileName, true);
            fileHandler.setFormatter(new CustomFormatter());
            fileHandler.setLevel(Level.ALL);

            // Configure ConsoleHandler
            final ConsoleHandler consoleHandler = new ConsoleHandler();
            consoleHandler.setFormatter(new CustomFormatter());
            consoleHandler.setLevel(Level.ALL);

            // Configure the logger
            logger.setLevel(Level.ALL); // Log all levels (FINEST to SEVERE)
            logger.setUseParentHandlers(false); // Prevent logging to parent handlers
            logger.addHandler(fileHandler);
            logger.addHandler(consoleHandler);

            // Mark as configured
            isConfigured = true;

            // Log a startup message
            logger.info("Logging configured successfully. Writing to: " + logFileName);
        } catch (Exception ex) {
            logger.severe("Failed to configure logging: " + ex.getMessage());
        }
    }

    /**
     * Custom formatter for log messages with a clean, readable format.
     */
    private static class CustomFormatter extends Formatter {
        private static final DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SSS");

        @Override
        public String format(LogRecord logRecord) {
            final String timestamp = LocalDate.now().atTime(logRecord.getInstant().atZone(ZoneId.systemDefault()).toLocalTime())
                    .format(dtf);
            final String threadName = Thread.currentThread().getName();
            final String level = logRecord.getLevel().getName();
            final String loggerName = logRecord.getLoggerName();
            final String message = formatMessage(logRecord);
            String throwable = "";
            if (logRecord.getThrown() != null) {
                final StringWriter sw = new StringWriter();
                final PrintWriter pw = new PrintWriter(sw);
                logRecord.getThrown().printStackTrace(pw);
                throwable = "\n" + sw;
            }

            return String.format("%s [%s] %-7s %s - %s%s%n",
                    timestamp, threadName, level, loggerName, message, throwable);
        }
    }
}
