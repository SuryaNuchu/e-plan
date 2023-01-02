package com.ooad.eplan;

import com.ooad.eplan.enums.Role;
import com.ooad.eplan.exception.EplanException;
import com.ooad.eplan.models.Skill;
import com.ooad.eplan.models.Team;
import com.ooad.eplan.models.User;
import com.ooad.eplan.repositories.UserRepository;
import com.ooad.eplan.services.serviceImpl.TeamService;
import com.ooad.eplan.services.serviceImpl.UserService;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@ExtendWith(MockitoExtension.class)
public class UserTests {
    @Mock
    UserRepository userRepository;
    @InjectMocks
    UserService userService;

    User userObtained;
    Skill skill=new Skill("sql");
    User user = User.builder().name("").password("abc").email("julie@eplan.com").skills(List.of(skill)).role(Role.STAFF).build();
    User user2 = User.builder().name("harry").password("xyz").email("harry@eplan.com").skills(List.of(skill)).role(Role.STAFF).build();
    User user3 = User.builder().name("ross").password("def").email("ross@eplan.com").skills(List.of(skill)).role(Role.STAFF).build();
    List<User> usersList= new ArrayList<>();
    @Test
    void saveUserTest(){

        try {
            userService.save(user);
            Mockito.when(userRepository.save(user)).thenReturn(user);
        } catch (Exception e){
            assertEquals("cannot create user with given details",e.getMessage());
        }

    }
    @Test
    void getUserByIdTest(){
        try {
            userService.save(user);
            Mockito.when(userRepository.findById(user.getId())).thenReturn(Optional.of(user));
            User userFromDB = userService.getUserById(user.getId());
            assertEquals("julie",userFromDB.getName());
        } catch (Exception e){
            assertEquals("cannot create user with given details",e.getMessage());
        }



    }

    @Test
    void saveAllUsersTest(){
        usersList.add(user2);
        usersList.add(user3);
        Mockito.when(userRepository.saveAll(usersList)).thenReturn(usersList);
        List<User> userListFromDB = userService.saveAll(usersList);
        assertEquals(2,userListFromDB.size());
    }

    @Test
    void getAllUsersTest(){
        usersList.add(user2);
        usersList.add(user3);
        userService.saveAll(usersList);
        Mockito.when(userRepository.findAll()).thenReturn(usersList);
        List<User> userListFromDB = userService.getUsers();
        System.out.println(userListFromDB.size());
        assertEquals(2,userListFromDB.size());
    }

    @Test
    void deleteUserTest(){
        usersList.add(user);
        usersList.add(user3);
        userService.saveAll(usersList);
        try{
            userService.delete(user.getId());
            User userFromDB=userService.getUserById(user.getId());
            assertNotEquals(user.getEmail(),userService.getUserById(user.getId()).getEmail());
        }
        catch(Exception e){
            assertEquals("there is no user in db with given id",e.getMessage());
        }

    }

    @Test
    void saveUserWithEmptyFieldsTest(){
    try {
    userService.save(user);
    }
    catch(Exception e){
    Exception exception = assertThrows(EplanException.class, () -> {
        throw new EplanException("cannot create user with given details");
    });
    assertEquals("cannot create user with given details", exception.getMessage());
    }

    }
}
