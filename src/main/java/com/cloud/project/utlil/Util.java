package com.cloud.project.utlil;

public class Util {

    /**
     * Normalize by removing  specials characters
     * @param string string to normalize
     * @return String without specials characters
     */
    public static String normalize(String string) {
        return string.replace(".", "")
                    .replace("@", "");
    }
}
