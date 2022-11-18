import { React, useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import Form from 'react-bootstrap/Form';
import { filter, includes, isEmpty, lowerCase } from 'lodash';
import Button from "@restart/ui/esm/Button";

import { CREATE_ASSET, UPDATE_ASSET, DELETE_ASSET } from '../../graphql/mutations/assetMutations';
import Loading from "../layout/loading";
import { getAllAssets } from "../../graphql/queries/assetQueries";
import Table from "../layout/table";
import CustomModal from '../modals';
import './index.css'

const Asset = () => {
  const { error, loading, data, refetch } = useQuery(getAllAssets);
  const [assets, setAssets] = useState([]);
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [searchedAsset, setSearchedAsset] = useState(assets);
  const [selectedAsset, setSelectedAsset] = useState({});
  const [asset, setAsset] = useState({
    ASSET_ID: isEmpty(selectedAsset) ? '' : selectedAsset.ASSET_ID,
    BRANCH_ID: isEmpty(selectedAsset) ? '' : selectedAsset.BRANCH_ID,
    NAME: isEmpty(selectedAsset) ? '' : selectedAsset.NAME,
    TYPE: isEmpty(selectedAsset) ? '' : selectedAsset.TYPE,
    COST: isEmpty(selectedAsset) ? '' : selectedAsset.COST,
    STATUS: isEmpty(selectedAsset) ? '' : selectedAsset.STATUS,
    DATE_OF_PURCHASE: isEmpty(selectedAsset) ? '' : selectedAsset.DATE_OF_PURCHASE,
  })
  const [createAsset, {err1, result1}] = useMutation(CREATE_ASSET, {
    variables: {asset}
  })
  const [updateAsset, {err2, result2}] = useMutation(UPDATE_ASSET, {
    variables: {asset}
  })
  const [deleteAsset, {err3, result3}] = useMutation(DELETE_ASSET, {
    variables: {assetId: asset.ASSET_ID}
  })

  let assetesList = assets;

  useEffect(() => {
    console.log('-->',data);
    if (data) {
      setAssets(data.getAllAssets);
      setSearchedAsset(data.getAllAssets)
    }
  }, [data]);
  
  const onSearch = (event) => {
    let name = event.target.value;
    if (name.length > 0) assetesList = filter(assetesList, b => includes(lowerCase(b.NAME), lowerCase(name)))
    else assetesList = assets;
    setSearchedAsset(assetesList);
  }

  const addAsset = () => {
    setSelectedAsset({});
    setShowAssetModal(true)
  }

  const manageAsset = (row) => {
    setSelectedAsset(row);
    setAsset(row);
    setShowAssetModal(true)
  }

  return (
    <>
      <Loading isLoading={loading} />
      <div className="operation-row">
        <Form.Control className="input-field" type="text" placeholder="Search Asset Name" onKeyUp={onSearch} />
        <Button className="add-btn" onClick={addAsset}>Add New Asset</Button>
      </div>
      <Table tableHeaders={['ASSET ID', 'BRANCH ID', 'NAME', 'TYPE', 'COST($)', 'STATUS', 'DATE OF PURCHASE']} tableRows={searchedAsset} manageRow={manageAsset}  />
      <CustomModal
        title='Asset'
        show={showAssetModal}
        setShow={setShowAssetModal}
        selectedData={selectedAsset}
        data={asset}
        setData={setAsset}
        createData={createAsset}
        refetch={refetch}
        updateData={updateAsset}
        deleteData={deleteAsset}
        defaultData={{ASSET_ID: '', BRANCH_ID: '', NAME:'', TYPE: '', COST: '', STATUS: '', DATE_OF_PURCHASE: ''}}
      />
    </>
  );
}

export default Asset;