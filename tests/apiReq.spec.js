const { test, expect, request } = require('@playwright/test');
var userid;

test("Get Users", async () => {
    const apiContext = await request.newContext();

    const response = await apiContext.get(
        'https://reqres.in/api/users?page=2',
        {
            headers: {
                'x-api-key': 'free_user_3Evy7tt5yrEhumt72npKcMHsTKr'
            }
        }
    );

    console.log(await response.json());
    expect(response.status()).toBe(200);
});

test("Create user", async ({ request }) => {

    const response = await request.post(
        'https://reqres.in/api/users',
        {
            data: {
                name: "kumar",
                job: "trainer"
            },
            headers: {
                Accept: "application/json",
                'x-api-key': 'free_user_3Evy7tt5yrEhumt72npKcMHsTKr'
            }
        }
    );

    console.log(await response.json());

    expect(response.status()).toBe(201);
    var res =await response.json();
    userid = res.id;
});

test("Update user", async ({request})=>{
    const response = await request.put('https://reqres.in/api/users/'+userid,
        {
            data:{"name":"kumar","job":"engineer"},
            headers:{"Accept":"application/json",
            'x-api-key': 'free_user_3Evy7tt5yrEhumt72npKcMHsTKr'}
        }
    );
    console.log(await response.json())
    expect(response.status()).toBe(200);
})

test("Delete user", async ({request})=>
{
    const response = await request.delete('https://reqres.in/api/users/'+userid,
        {
            headers:{
                'x-api-key': 'free_user_3Evy7tt5yrEhumt72npKcMHsTKr'
            }
        }
    );
    expect(response.status()).toBe(204)
})