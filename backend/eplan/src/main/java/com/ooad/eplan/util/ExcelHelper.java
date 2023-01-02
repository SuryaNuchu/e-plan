package com.ooad.eplan.util;


import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import com.ooad.eplan.enums.Role;
import com.ooad.eplan.models.Skill;
import com.ooad.eplan.models.User;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.web.multipart.MultipartFile;


public class ExcelHelper {
    public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = {"name", "email", "skills", "role"};
    static String SHEET = "NACE_REV2_20210204_135820";

    public static boolean hasExcelFormat(MultipartFile file) {

        if (!TYPE.equals(file.getContentType())) {
            return false;
        }
        return true;
    }

    public static List<User> excelToUsers(InputStream is) {
        try {
            Workbook workbook = new XSSFWorkbook(is);
            Sheet sheet = workbook.getSheet(SHEET);
            Iterator<Row> rows = sheet.iterator();

            List<User> users = new ArrayList<>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();

                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;
                }

                Iterator<Cell> cellsInRow = currentRow.iterator();

                User user = User.builder().name("").password("").email("").skills(List.of()).role(Role.STAFF).build();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    currentCell.setCellType(CellType.STRING);
                    switch (cellIdx) {
                        case 0:
                            user.setName(currentCell.getStringCellValue());
                            break;

                        case 1:
                            user.setEmail(currentCell.getStringCellValue());
                            break;

                        case 2:
                            user.setSkills(Arrays.stream(currentCell.getStringCellValue().split(",")).map(s -> new Skill(s)).collect(Collectors.toList()));
                            break;

                        case 3:
                            user.setRole(Role.valueOf(currentCell.getStringCellValue()));
                            break;

                        default:
                            break;
                    }

                    cellIdx++;
                }

                users.add(user);
            }

            workbook.close();

            return users;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}


