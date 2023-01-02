package com.ooad.eplan;

import com.ooad.eplan.models.User;
import com.ooad.eplan.util.ExcelHelper;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class BulkImportTests {

    @Test
    void loadFile() throws FileNotFoundException {
        File file = new File("src/test/java/com/ooad/eplan/Worksheet.xlsx");
        InputStream targetStream = new FileInputStream(file);
        List<User> workSheets = ExcelHelper.excelToUsers(targetStream);
        assertEquals(2, workSheets.size());
    }

    @Test
    void validateData() throws FileNotFoundException {
        File file = new File("src/test/java/com/ooad/eplan/Worksheet.xlsx");
        InputStream targetStream = new FileInputStream(file);
        List<User> workSheets = ExcelHelper.excelToUsers(targetStream);
        assertEquals("Surya", workSheets.get(0).getName());
    }
}
