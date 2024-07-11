#Write-Host "hola"
Set-Variable -Name "STORE_API_BASE" -Value (docker images | grep store_api_base)
Write-Host $STORE_API_BASE
if( !$STORE_API_BASE ){
    cd .\apis\store_api\
    #get-content Dockerfile
    docker build -t store_api_base .
    cd ..
    cd ..
}
cd .\dashboard\frontend\
invoke-expression 'cmd /c start powershell -Command { npm run dev }'
cd ..
cd ..
docker-compose up db mysql_db redis store_api store_api_inventory api_gw