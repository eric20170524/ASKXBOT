import { FileNode } from './types';

export const MOCK_FILE_SYSTEM: FileNode[] = [
  {
    id: 'root',
    name: 'code',
    type: 'folder',
    children: [
      { id: '1', name: '启动', type: 'folder', children: [] },
      { id: '2', name: '代码', type: 'folder', children: [] },
      { id: '3', name: '开发者', type: 'folder', children: [] },
      { id: '4', name: '等级', type: 'folder', children: [] },
      { id: '5', name: '首页', type: 'folder', children: [] },
      { id: '6', name: '失落+寻找', type: 'folder', children: [] },
      { id: '7', name: '媒体', type: 'folder', children: [] },
      { id: '8', name: 'MNT', type: 'folder', children: [] },
      { id: '9', name: 'OPT', type: 'folder', children: [] },
      { id: '10', name: '触发', type: 'folder', children: [] },
      { id: '11', name: '根', type: 'folder', children: [] },
      { id: '12', name: '跑', type: 'folder', children: [] },
      { id: '13', name: 'SRV', type: 'folder', children: [] },
      { id: '14', name: '交换', type: 'folder', children: [] },
      { id: '15', name: '系统', type: 'folder', children: [] },
      { id: '16', name: 'TMP', type: 'folder', children: [] },
      { id: '17', name: '苏联', type: 'folder', children: [] },
      { id: '18', name: 'VAR', type: 'folder', children: [] },
      { 
        id: '19', 
        name: '.微沙盒', 
        type: 'file', 
        content: `TEMPLATE_ID=5ccea9f7-b9d3-42d5-ad7f-81fbbdbbf69f
BUILD_ID=c3d54306-dc8d-47d1-beb2-5942276e59ff
CREATED_AT=2026-02-24T09:41:13+00:00
DEFAULT_USER=user
DEFAULT_WORKDIR=/home/user`
      },
      { id: '20', name: '垃圾桶', type: 'folder', children: [] },
      { id: '21', name: '自由党', type: 'folder', children: [] },
      { id: '22', name: '自由64', type: 'folder', children: [] },
      { id: '23', name: '供应-开始', type: 'folder', children: [] },
      { id: '24', name: 'provision.result', type: 'file', content: 'Provisioning completed successfully.' },
      { id: '25', name: 'SBIN', type: 'folder', children: [] },
    ]
  }
];
